import { useState } from 'react';
import { Order } from '../types';
import { orders } from '../data';

export default function useOrders() {
    const [orderList, setOrderList] = useState<Order[]>(orders);

    // change order status group
    const changeOrderStatusGroup = (OrderStatusGroup: string) => {
    };

    return { orderList, changeOrderStatusGroup };
}
