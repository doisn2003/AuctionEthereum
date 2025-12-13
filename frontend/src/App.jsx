import Header from './components/Header';
import Footer from './components/Footer';
import Button from './components/Button';

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
      <Header />
      
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Chào mừng đến với React</h3>
        <p>Thử tương tác với các component Button phía dưới:</p>
        
        {/* Tái sử dụng Component Button với các props khác nhau */}
        <Button label="Đăng nhập" onClick={handleLogin} />
        <Button label="Đăng ký" onClick={handleRegister} />
      </main>

      <Footer />
    </>
  );
}

export default App;