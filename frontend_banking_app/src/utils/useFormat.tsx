import {FullUserData, SimpleAccountDetails} from "../types/Types";

const useFormat = () => {

  const formatBalance = (raw: number | undefined): string => {
    if(raw === undefined) return "0,00";

    return raw.toLocaleString("de", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  const formatBalanceSum = (accounts: SimpleAccountDetails[]): string => {
    let sum: number = 0;
    accounts.map((account) => sum += account.balance)
    return formatBalance(sum);
  }

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString("de");
  }

  const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString("de");
  }

  const formatAccountCount = (userData: FullUserData): string => {
    const count: number = userData.accounts.length;
    if(count === 0) return "no accounts";
    if(count === 1) return "1 account";
    return `${count} accounts`;
  }

  const formatActiveAccountCount = (userData: FullUserData): string => {
    const activeAccounts: SimpleAccountDetails[] = userData.accounts.filter((account) => account.active)

    const count: number = activeAccounts.length;
    if(count === 0) return "no active accounts";
    if(count === 1) return "1 active account";
    return `${count} active accounts`;
  }

  return { formatBalance, formatBalanceSum, formatDate, formatTime, formatAccountCount, formatActiveAccountCount };
};

export default useFormat;