import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
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

export function useUser(options?: UseUserProps) {

  const { data, error } = useSWR('/auth/user', fetcher);
  const finished = Boolean(data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;
    if (data.user) dispatch(setAuth({ user: data.user, loggedIn: true }));
    if (options && data.user) {
      Router.push(options.redirectTo);
    }
  }, [finished]);

}
