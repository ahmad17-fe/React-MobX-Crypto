import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import TableMarket from "./components/TableMarket";
import { useMarketStore } from "./store/CryptoMarketStore";
import Pagination from "./components/Pagination";

const App = observer(() => {
  const store = useMarketStore();
  useEffect(() => {
    store.fetchMarket();
  }, [store]);

  return (
    <div className="bg-gray-900 min-w-min min-h-screen h-full">
      <div className="container lg:max-w-7xl md:w-5/6 w-10/12 mx-auto">
        <div className="text-3xl text-gray-100 font-semibold w-full h-28 flex items-center">
          <img width="48px" src={store.logo} alt="logo" />
          {"  "}Crypto App
        </div>
        <TableMarket data={store.market} isLoading={store.isLoading} />
        <Pagination />
      </div>
    </div>
  );
});

export default App;
