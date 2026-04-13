import { useEffect, useState } from 'react';
import { useCourseStore } from '../store/useCourseStore';
import { getSession } from '../lib/auth-client';
import Hero from './Hero';
import Introduction from './Introduction';
import GoldenRules from './GoldenRules';
import Footer from './Footer';
import Dashboard from './Dashboard';

export default function HomeRouter() {
  const { isLoggedIn, login } = useCourseStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getSession().then((result) => {
      const user = result.data?.user;
      if (user) {
        login(user.id, user.email);
      }
    }).catch(() => {});
  }, []);

  if (!mounted) return null;

  if (isLoggedIn) return <Dashboard />;

  return (
    <>
      <Hero />
      <Introduction />
      <GoldenRules />
      <Footer />
    </>
  );
}
