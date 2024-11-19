import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Banner from '../../components/Banner/Banner';
import RowList from '../../components/Rows/RowList/RowList';
import RowSkeleton from '../../components/LoadingSkeleton/RowSkeleton';
import './Home.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000, // 5 minutes
      cacheTime: 3600000, // 1 hour
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const Home = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="home">
        <div className="home__gradient">
          <Header />
          <Suspense fallback={<RowSkeleton />}>
            <Banner />
            <div className="home__content">
              <RowList />
            </div>
          </Suspense>
          <Footer />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Home;
