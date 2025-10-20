import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { AuthContext } from "../../../Contexts/AuthContext"
import { getOrderQuery } from "../../../utils/http";
import OrderHeader from "./OrderHeader";
import OrderBody from "./OrderBody";

import EmptyMenu from "../../../UI/emptyMenu/EmptyMenu";
import { Package } from "lucide-react";

export default function Orders() {
  const { token } = useContext(AuthContext);

  const { data } = useQuery({
    queryFn: () => {
      return getOrderQuery({ jwtToken: token })
    },
    queryKey: ['orders']
  })
  console.log(data) ;
  return (
    <>
      <div className="flex-col  flex items-center gap-6 w-full">
        {data && data.orders.map(order => {
          return (
            <div key={order._id} className="flex w-4/5 items-center flex-col bg-gray-100 pb-6 rounded-lg shadow-xl">
              <OrderHeader order={order} />

              <div className="px-6 pt-4 w-full flex flex-col gap-4">
                {order.order.items.map(item => {
                  return (
                    <OrderBody item={item} key={item.itemId} />
                  )
                })}
              </div>
            </div>
          )
        })}
        {data && data.orders.length === 0 && <EmptyMenu icon={<Package size={64} className="mx-auto text-gray-400" />} />}
      </div>
    </>
  );
}
