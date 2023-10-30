import moment from "moment";

const checkIsTokenExpired = (date: string) => {
  const now = moment();
  const supposedFuture = moment(date);
  const diff = supposedFuture.diff(now, "seconds");
  if (diff <= 0) {
    return true;
  }
  return false;
};

export default checkIsTokenExpired;
