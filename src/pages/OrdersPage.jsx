import { useEffect } from 'react';

import useOrderStore from '../hooks/useOrderStore';

import Orders from '../components/Orders';

export default function OrdersPage() {
  const orderStore = useOrderStore();

  // TODO: 주문내역을 fetch해줘야 하고, 페이징도 고려해야 함

  useEffect(() => {

  }, []);

  return (
    <Orders />
  );
}
