import { runInAction, makeAutoObservable } from "mobx";
import axios from "axios";
import { createContext, useContext } from "react";

class CryptoMarketStore {
  market = [];
  isLoading = false;
  page = 1;
  logo =
    "data:image/png;base64,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";

  constructor() {
    makeAutoObservable(this);
  }

  nextPage() {
    this.page++;
    this.fetchMarket();
  }

  prevPage() {
    if (this.page > 1) this.page--;
    this.fetchMarket();
  }

  async fetchMarket() {
    this.isLoading = true;
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=idr&per_page=10&page=${this.page}`
      );

      runInAction(() => {
        this.market = res.data;
        this.isLoading = false;
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}

const MarketContext = createContext(new CryptoMarketStore());

const MarketProvider = ({ children }) => {
  const store = new CryptoMarketStore();
  return (
    <MarketContext.Provider value={store}>{children}</MarketContext.Provider>
  );
};

const useMarketStore = () => useContext(MarketContext);

export { CryptoMarketStore, MarketProvider, useMarketStore };
