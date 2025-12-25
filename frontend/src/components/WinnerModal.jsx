import React from 'react';

const WinnerModal = ({ items, onClose }) => {
    if (!items || items.length === 0) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000,
            backdropFilter: 'blur(5px)'
        }} onClick={onClose}>
            <div
                className="winner-card"
                style={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #FDB931 100%)',
                    padding: '3rem',
                    borderRadius: '1rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    maxWidth: '500px',
                    width: '90%',
                    color: '#713f12',
                    maxHeight: '90vh',
                    overflowY: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <span className="material-symbols-outlined" style={{ fontSize: '64px', marginBottom: '1rem' }}>emoji_events</span>
                <h1 className="winner" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
                    Chúc mừng bạn đã chiến thắng!
                </h1>

                <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Bạn đã thắng {items.length} vật phẩm:</h2>

                <div className="win_items_list" style={{ marginBottom: '1.5rem' }}>
                    {items.map((item, index) => (
                        <div key={index} style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            padding: '0.5rem',
                            borderBottom: index < items.length - 1 ? '1px solid rgba(113, 63, 18, 0.2)' : 'none'
                        }}>
                            Số đẹp: {item.id}
                        </div>
                    ))}
                </div>

                <p style={{ fontWeight: 600 }}>Chúng tôi đã gửi cho bạn email xác nhận. Vui lòng liên hệ với chúng tôi để hoàn tất thủ tục bàn giao.</p>

                <button
                    onClick={onClose}
                    style={{
                        marginTop: '2rem',
                        padding: '0.75rem 2rem',
                        backgroundColor: 'white',
                        color: '#854d0e',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default WinnerModal;
