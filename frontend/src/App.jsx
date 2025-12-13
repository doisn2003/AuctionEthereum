import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Dealday from './components/DealDay';
import FilterBar from './components/FilterBar';
import AuctionGrid from './components/AuctionGrid';

function App() {
  // Logic: Hàm xử lý sự kiện
  const handleLogin = () => {
    alert("Bạn đã nhấn nút Login!");
  };

  const handleRegister = () => {
    console.log("Đang chuyển trang đăng ký...");
  };

  // View
  return (
    // React Fragment (<>...</>): React bắt buộc chỉ trả về 1 thẻ cha duy nhất.
    // Dùng cái này để gom nhóm mà không sinh ra thẻ div thừa trong HTML.
    <>
      <Navbar />
      <Hero />
      <Dealday />
      <FilterBar />
      <AuctionGrid />
      <Footer />
    </>
  );
}

export default App;