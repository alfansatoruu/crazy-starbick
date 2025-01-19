import React, { useState, useEffect } from 'react';
import productData from './products.json';
import './GaleriUtama.css';
import { Search } from 'lucide-react';
import BackgroundImageStarbuck from './BackgroundImageStarbuck';
import './navbar.css';
import './kontainer-detail-product.css';


const Beranda = () => {
    const [indeksSaatIni, setIndeksSaatIni] = useState(0);
    const [warnaBg, setWarnaBg] = useState(productData[0].warnaBg);
    const [backgroundImage, setBackgroundImage] = useState(productData[0].imageBg);
    const [ukuranTerpilih, setUkuranTerpilih] = useState('');
    const [kumpulanGambar, setKumpulanGambar] = useState(productData[0].kumpulanGambar);
    const [deskripsiKomposisi, setdeskripsiKomposisi] = useState(productData[0].kumpulanGambar);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const slideSelajutnya = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setIndeksSaatIni((prevIndex) =>
            prevIndex === productData.length - 1 ? 0 : prevIndex + 1
        );
    };

    const slideSebelumnya = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setIndeksSaatIni((prevIndex) =>
            prevIndex === 0 ? productData.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const currentProduct = productData[indeksSaatIni];
        setWarnaBg(currentProduct.warnaBg);
        setBackgroundImage(currentProduct.imageBg);
        setUkuranTerpilih('');
        setKumpulanGambar(currentProduct.kumpulanGambar);
        setdeskripsiKomposisi(currentProduct.deskripsiKomposisi);


        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [indeksSaatIni]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.navbar')) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="stack-pertama">
            <div className="navbar">
                <div className="navbar-container">
                    <div className="logo">
                        <img src="LOG.png" alt="Logo" />
                    </div>
                    <div className='text-logo'>
                        <p>CRAZY STARBICK</p>
                    </div>
                    <div className="search-container">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                if (e.target.value) {
                                    const filtered = productData.filter(product =>
                                        product.nama.toLowerCase().includes(e.target.value.toLowerCase()) ||
                                        product.id?.toString().includes(e.target.value)
                                    );
                                    setSearchResults(filtered);
                                    setShowResults(true);
                                } else {
                                    setSearchResults([]);
                                    setShowResults(false);
                                }
                            }}
                            onFocus={() => {
                                if (searchTerm) setShowResults(true);
                            }}
                            placeholder="Search by name or ID..."
                            className="search-input"
                        />
                        <Search
                            size={20}
                            color="#666"
                            className="search-icon"
                        />

                        {showResults && searchResults.length > 0 && (
                            <div className="search-results">
                                {searchResults.map((product, index) => (
                                    <div
                                        key={product.id || index}
                                        className="search-result-item"
                                        onClick={() => {
                                            const productIndex = productData.findIndex(p =>
                                                p.nama === product.nama
                                            );
                                            setIndeksSaatIni(productIndex);
                                            setSearchTerm('');
                                            setShowResults(false);
                                        }}
                                    >
                                        <img
                                            src={product.gambar}
                                            alt={product.nama}
                                            className="search-result-image"
                                        />
                                        <div className="search-result-info">
                                            <div className="search-result-name">{product.nama}</div>
                                            <div className="search-result-description">
                                                {product.deskripsi?.substring(0, 60)}...
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <BackgroundImageStarbuck>
                <div className="background-starbuck">
                    <div
                        className="background-container-pertama"
                        style={{
                            backgroundColor: warnaBg,
                            transition: 'background-color 0.5s ease',
                        }}
                    ></div>

                    <div
                        className="background-container-kedua"
                        style={{
                            backgroundImage: `url(${backgroundImage})`,
                            transition: 'background-image 0.5s ease',
                        }}
                    ></div>

                    <div className="main-content">
                        <div className="topping-info-card">
                            <h3>Topping:</h3>
                            <div className="timeline">
                                {kumpulanGambar.map((gambar, index) => (
                                    <div
                                        className={`topping-item ${index % 4 === 0 ? "left-item" : "right-item"}`}
                                        key={index}
                                    >
                                        <div className="topping-content">
                                            <div className="topping-border">
                                                <span className="topping-index">{index + 1}</span>
                                            </div>
                                            <img className="topping-image" src={gambar.file} alt={gambar.nama} />
                                            <span className="topping-name">{gambar.nama}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="product-display">
                            <img
                                src={productData[indeksSaatIni].gambar}
                                alt={productData[indeksSaatIni].nama}
                                className={`product-image ${isAnimating ? 'animate-image' : ''}`}
                                style={{ cursor: 'pointer' }}
                            />
                            <h3 className={`product-name ${isAnimating ? 'animate-name' : ''}`}>
                                {productData[indeksSaatIni].nama}
                            </h3>
                            <div className="navigation-buttons">
                                <button onClick={slideSebelumnya} disabled={isAnimating}>
                                    ←
                                </button>
                                <button onClick={slideSelajutnya} disabled={isAnimating}>
                                    →
                                </button>
                            </div>
                        </div>

                        <div className="product-info-card">
                            <h3>{productData[indeksSaatIni].nama}</h3>
                            <p>{productData[indeksSaatIni].deskripsi}</p>
                            <div className="size-buttons">
                                {productData[indeksSaatIni].ukuran.map((size) => (
                                    <div
                                        key={size}
                                        className={`size-button ${ukuranTerpilih === size ? 'active' : ''}`}
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </BackgroundImageStarbuck>


            <div className='kontainer-detail-product'>
                <div className='image-background-logo'>
                    <div className="kontainer-product-view">
                        <div className="detailnya">
                            <h3 className="product-title fade-in">{productData[indeksSaatIni].nama}</h3>

                            <div className="video-section slide-up">
                                <h4>Video Tutorial</h4>
                                <video
                                    src={productData[indeksSaatIni].video}
                                    controls
                                    className="product-video"
                                    poster={productData[indeksSaatIni].gambar}
                                >
                                    Terjadi kesalahan saat memuat video.
                                </video>
                            </div>

                            <div className="komposisi-section slide-up">
                                <h4>Nikmati</h4>
                                <div className="timeline-deskripsi">
                                    {deskripsiKomposisi.map((gambar, index) => (
                                        <div className="topping-content-deskripsi" key={gambar.id || index}>
                                            <img className="topping-image-deskripsi" src={gambar.file} alt={gambar.nama} />
                                            <span className="topping-name-deskripsi">{gambar.nama}</span>
                                        </div>
                                    ))}
                                </div>

                            </div>
                            <h4 className='komposisi-teks'>Resep dan Tutorial</h4>
                            <div className="resep-section slide-up">
                                <div className="bahan">
                                    <h5>Bahan:</h5>
                                    <ul>
                                        {productData[indeksSaatIni].resep.bahan.map((item, index) => (
                                            <li key={index} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="langkah">
                                    <h5>Langkah pembuatan:</h5>
                                    <ol>
                                        {productData[indeksSaatIni].resep.langkah.map((step, index) => (
                                            <li key={index} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                                {step}
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Beranda;