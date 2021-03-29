import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

interface CheckIn {
 uuid: string;
 formattedAddress: string;
}

interface CheckInProps {
  checkIn: CheckIn
}

export const getServerSideProps: GetServerSideProps = async ({ query }: GetServerSidePropsContext) => {

  const checkIn = {
    uuid: query.uuid,
    formattedAddress: 'Sturenkatu 37-41 B 16'
  };

  return {
    props: {
      checkIn
    }
  };

};

const CheckIn = ({ checkIn }: CheckInProps) => {

  const router = useRouter();
  const { uuid, formattedAddress } = checkIn;

  return <p>CheckIn: {uuid}, {formattedAddress}</p>;

};

export default CheckIn;
