export const formatCurrency = (amount: number) => {
    const formatedCurrency = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount)
    return formatedCurrency
}