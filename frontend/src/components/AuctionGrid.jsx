import React from 'react';
import AuctionCard from './AuctionCard';


const items = [
  {
    id: '1',
    lotNumber: 2045,
    title: 'Leica M3 Single Stroke',
    description: 'Excellent condition 1957 model with Summicron 50mm lens.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYsvUuuF0WqDqFLIzaRx-EaKTXWMzETHtGsvsKZq_42gXTAZ-sdruDVRcJSPgYgtDnbwT2tjuE4kErzQ2oux99N-5BLt0D2DjtdZcvjVOVY9ilk7viBZkdwUncPY6oxG9BN4qgvI08bFcArx9qk2GDxeS-9n1unMj5s_6BGpPdBhTJhtxU-6skdf5y6qmf8t7oFQsaRKI2T7u1bX6AvUpt7Lk0aXB6ggv_Dfs_gZdDKCESd2qffj1SR_DH5c4e7_kbICptk--CA78t',
    currentBid: 3200,
    endTime: '2h 45m left',
    timeLeftType: 'hours',
    isHot: false
  },
  {
    id: '2',
    lotNumber: 2046,
    title: '1967 Porsche 911 S',
    description: 'Restored to factory specifications. Polo Red exterior.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6kN2-_A6eZeP6zkqZP7T6JkzInVIj8l8ZPFg2ZLm5G0RHAdWO4hEuIqE7mCndFXbfhjsWw30VFSes6GkcjXXVwXeGX8A7qLfBBOHWytV12qzXj3lybd1r6SI-gGAmSy7BPZZ1vv634OnkB8rlaTYK87gPqYDFY62vxuKhHe_19KpU7BuVW0g34CXkaz_iL50zJ5XrVlIBwXypEjMJN3-_odyDBLwR5kf2Zvay4RvXUMOSZj_ZbbFQPk9VpH8YiVFFLmM6nDG03_qk',
    currentBid: 145000,
    endTime: 'Hot',
    timeLeftType: 'days',
    isHot: true
  },
  {
    id: '3',
    lotNumber: 2047,
    title: 'Abstract Composition No. 4',
    description: 'Original oil on canvas by emerging artist Elena V.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWxNk4XmoFRZiGp2pK_vG9AVyTl2q8_i8zxgdvHQDmuvwl6cXkc7CYKYQMjBfxh5mi_rLqp6NNvdFUIyA1b9Gcic6j205T0qK4_q7oMkPzfHaDQSwCrxUOigtKBO_Sycx3e5orDj5w4NZP6S3Bq6i8HslVYQDS5yM19oi8cfXQs7tqqYo3ldKoUKqtuURzWkC3Kyv32-d48imPbmcmj8CbuaPr8BpUL43JIcit91pMS1qhmazfq7LTlIpo3idRycHm8HsXCRjGtozy',
    currentBid: 850,
    endTime: '1d 12h left',
    timeLeftType: 'days',
    isHot: false
  },
  {
    id: '4',
    lotNumber: 2048,
    title: 'Platinum Solitaire Ring',
    description: '2.5 carat brilliant cut diamond, VVS1 clarity.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2fW0c1ognlebrQEeKna9hNxzNtibMvNB7We8Cu1T5LJIjkFNKkv_E4Kkhv7j9r55NO6co3X8vbvgEwx_mZfg9mBThOZrcfToXZmqVgAb3QehjAm8k9YmGEWLwPhXJI5sxtwihrGuBPcX-nPvpsisci0JMrZ_mlML4l3GQ57kB452vlr3e5yBUAl8PaMHdr8wc3K3JLDVIsLDjjYDJvHM5nYCf6cEp66SokTsnDFBjDrxTuz3vgopWTTBBD-JlDnjarqaDRKKl3o_s',
    currentBid: 8900,
    endTime: '45m left',
    timeLeftType: 'mins',
    isHot: false
  },
  {
    id: '5',
    lotNumber: 2049,
    title: 'Mint Condition NES Bundle',
    description: 'Original 1985 packaging, unopened games included.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAisXt3mwZIBabfn8W2T6GnXsYxA6SHttSpoSo47PFDDJIgGrWb349mO4QPewdpnOl7h5CAfAFI2_L9KkSbYQK2_FHppj8UXCHXnWvQ1owTgF5o4aU1F-KP6AneGg4q_t52g_N5srWlnekCZGPdWivcFogfEt3mAobXn9JDDzvrMB7h0NSP0otbmnOkGdW6irdjVG73SandCL2XAW0mTorCIbL-Tg9KAmBhV5MsPtxwUbJLDNeREfJRHe47HGmAW9MI0UE0DOSefjni',
    currentBid: 1250,
    endTime: '3d left',
    timeLeftType: 'days',
    isHot: false
  },
  {
    id: '6',
    lotNumber: 2050,
    title: 'Ming Dynasty Vase',
    description: 'Authenticated porcelain vase, excellent preservation.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJP124m4hsfG9xDw4CqtmQ2f3lM3nDdiHGEVv9UezrtoD-98jbclbkcm0BDMIOGOBQ4Ib4KaAa23WPxh4EU3haVPzNO4d_ZO3D65Tl2XlSAgMm3r0B-vPVpWW0GZ_O-bfmLxkJREF2f4iDb9Jxgk8CN6NcD7ESxQLUBuFNcxvDzGiNFuxpl02sycqGWcGoy_1BP4yxw0GLt-aSP0UklukIwZR-7_RvcuTV8kKZVhdfKXb9quEkCSLtSqyD5gHP7zi_RpHLlwN8alHF',
    currentBid: 12000,
    endTime: '6h 10m left',
    timeLeftType: 'hours',
    isHot: false
  },
  {
    id: '7',
    lotNumber: 2050,
    title: 'Ming Dynasty Vase',
    description: 'Authenticated porcelain vase, excellent preservation.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJP124m4hsfG9xDw4CqtmQ2f3lM3nDdiHGEVv9UezrtoD-98jbclbkcm0BDMIOGOBQ4Ib4KaAa23WPxh4EU3haVPzNO4d_ZO3D65Tl2XlSAgMm3r0B-vPVpWW0GZ_O-bfmLxkJREF2f4iDb9Jxgk8CN6NcD7ESxQLUBuFNcxvDzGiNFuxpl02sycqGWcGoy_1BP4yxw0GLt-aSP0UklukIwZR-7_RvcuTV8kKZVhdfKXb9quEkCSLtSqyD5gHP7zi_RpHLlwN8alHF',
    currentBid: 12000,
    endTime: '6h 10m left',
    timeLeftType: 'hours',
    isHot: false
  },
  {
    id: '2',
    lotNumber: 2046,
    title: '1967 Porsche 911 S',
    description: 'Restored to factory specifications. Polo Red exterior.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6kN2-_A6eZeP6zkqZP7T6JkzInVIj8l8ZPFg2ZLm5G0RHAdWO4hEuIqE7mCndFXbfhjsWw30VFSes6GkcjXXVwXeGX8A7qLfBBOHWytV12qzXj3lybd1r6SI-gGAmSy7BPZZ1vv634OnkB8rlaTYK87gPqYDFY62vxuKhHe_19KpU7BuVW0g34CXkaz_iL50zJ5XrVlIBwXypEjMJN3-_odyDBLwR5kf2Zvay4RvXUMOSZj_ZbbFQPk9VpH8YiVFFLmM6nDG03_qk',
    currentBid: 145000,
    endTime: 'Hot',
    timeLeftType: 'days',
    isHot: true
  }
];

const AuctionGrid = () => {
  return (
    <div className="container grid-wrapper">
      <div className="auction-grid">
        {items.map(item => (
          <AuctionCard key={item.id} item={item} />
        ))}
      </div>
      
      <div className="load-more-container">
        <button className="btn-load-more">
          Load More Auctions
          <span className="material-symbols-outlined">expand_more</span>
        </button>
      </div>
    </div>
  );
};

export default AuctionGrid;