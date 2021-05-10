import { runInAction, makeAutoObservable } from "mobx";
import axios from "axios";
import { createContext, useContext } from "react";

class CryptoMarketStore {
  market = [];
  isLoading = true;
  page = 1;

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
