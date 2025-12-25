
function Button({ label, onClick }) {
  const btnStyle = {
    padding: '10px 20px',
    margin: '10px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px'
  };

  return (
    <button style={btnStyle} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;