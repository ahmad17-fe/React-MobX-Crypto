import { observer } from "mobx-react-lite";
import { useMarketStore } from "../store/CryptoMarketStore";

const Pagination = observer(() => {
  const store = useMarketStore();
  return (
    <div className="w-full py-4 mt-4 flex justify-end">
      {store.page === 1 || store.isLoading ? (
        <button
          disabled
          className="bg-gray-600 text-gray-100 py-2 px-3 rounded"
        >
          Prev
        </button>
      ) : (
        <button
          onClick={() => store.prevPage()}
          className="bg-green-600 text-gray-100 py-2 px-3 rounded"
        >
          Prev
        </button>
      )}

      <div
        className={
          store.isLoading
            ? "text-gray-100 opacity-0 py-2 px-3"
            : "text-gray-100 opacity-1 py-2 px-3"
        }
      >
        {store.page}
      </div>

      {store.isLoading ? (
        <button
          disabled={store.isLoading}
          className="bg-gray-600 text-gray-100 py-2 px-3 rounded"
        >
          Next
        </button>
      ) : (
        <button
          onClick={() => store.nextPage()}
          className="bg-green-600 text-gray-100 py-2 px-3 rounded"
        >
          Next
        </button>
      )}
    </div>
  );
});

export default Pagination;
