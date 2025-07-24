import { useEffect, useState } from "react";

export function useRealtimeDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [affiliateStats, setAffiliateStats] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchAll = async () => {
      try {
        const dashboardRes = await fetch("http://localhost:5001/general/dashboard");
        const dashboardData = await dashboardRes.json();
        if (isMounted) setDashboard(dashboardData);

        const productsRes = await fetch("http://localhost:5001/client/products");
        const productsData = await productsRes.json();
        if (isMounted) setProducts(productsData);

        const customersRes = await fetch("http://localhost:5001/client/customers");
        const customersData = await customersRes.json();
        if (isMounted) setCustomers(customersData);

        const transactionsRes = await fetch("http://localhost:5001/client/transactions");
        const transactionsData = await transactionsRes.json();
        if (isMounted) setTransactions(transactionsData);

        // Fetch users
        const usersRes = await fetch("http://localhost:5001/client/users");
        if (usersRes.ok) {
          const usersData = await usersRes.json();
          if (isMounted) setUsers(usersData);
        }

        // Fetch affiliate stats
        const affiliateStatsRes = await fetch("http://localhost:5001/client/affiliateStats");
        if (affiliateStatsRes.ok) {
          const affiliateStatsData = await affiliateStatsRes.json();
          if (isMounted) setAffiliateStats(affiliateStatsData);
        }
      } catch (err) {
        if (isMounted) {
          setDashboard({});
          setProducts([]);
          setCustomers([]);
          setTransactions([]);
          setUsers([]);
          setAffiliateStats([]);
        }
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchAll(); // initial fetch
    const interval = setInterval(fetchAll, 10000); // every 10 seconds
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { dashboard, products, customers, transactions, users, affiliateStats };
}
