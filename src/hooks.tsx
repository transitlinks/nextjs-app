import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useSWR from 'swr';

import { setAuth } from './state/actions/auth';

const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null }
    });

interface UseUserProps {
  redirectTo: string;
}

export const useUser = (options?: UseUserProps): void => {

  const { data, error } = useSWR('/auth/user', fetcher);
  const finished = Boolean(data);
  const dispatch = useDispatch();

  console.log('fetching user', data);

  useEffect(() => {
    if (!data) return;
    if (data.user) dispatch(setAuth({ user: data.user, loggedIn: true }));
    if (options && data.user) {
      console.log('Redirecting');
      window.location.href = options.redirectTo;
    }
  }, [finished]);

}
