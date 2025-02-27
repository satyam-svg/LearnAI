import { StatusBar } from 'expo-status-bar';
import AppNavigator from './navigation';

export default function Layout() {
  return (
    <>
      {/* StatusBar ka color har screen pe red rahega */}
      <StatusBar style="light" backgroundColor="black" />
      <AppNavigator />
    </>
  );
}
