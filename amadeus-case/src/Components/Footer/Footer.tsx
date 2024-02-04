import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';


const Footer = () => {
    return (
        <footer className="bg-dark text-white">
            <div className="bg-secondary quick-links-section py-3">
                <div className="container">
                    <div className="row">
                        <div className="flex col-6">
                            <h5>Popüler Turistik Şehirler</h5><br/>
                            <ul className="list-unstyled">
                                <li>Izmir Uçak Bileti</li>
                                <li>İstanbul Uçak Bileti</li>
                                <li>Ankara Uçak Bileti</li>
                                <li>Antalya Uçak Bileti</li>
                                <li>Adana Uçak Bileti</li>
                                <li>Trabzon Uçak Bileti</li>
                                <li>Bodrum Uçak Bileti</li>
                                <li>Amsterdam Uçak Bileti</li>
                                <li>Marmaris Uçak Bileti</li>

                            </ul>
                        </div>
                        <div className="flex col-6">
                            <h5>Popüler Ülke ve Başkentler</h5> <br/>
                            <ul className="list-unstyled">
                                <li>Almanya Uçak Bileti</li>
                                <li>Mısır Uçak Bileti</li>
                                <li>İtalya Uçak Bileti</li>
                                <li>Fransa Uçak Bileti</li>
                                <li>İngiltere Uçak Bileti</li>
                                <li>İspanya Uçak Bileti</li>
                                <li>Yunanistan Uçak Bileti</li>
                                <li>Portekiz Uçak Bileti</li>
                                <li>İsveç Uçak Bileti</li>


                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-3">
                        <h5>İletişim</h5>
                        <ul className="list-unstyled">
                            <li>Adres: Izmir, Turkiye</li>
                            <li>Email: fulden.dogan@gmail.com</li>
                            <li>Telefon: </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Yardım</h5>
                        <ul className="list-unstyled">
                            <li>SSS</li>
                            <li>Destek Merkezi</li>
                            <li>İletişim</li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Hakkımızda</h5>
                        <ul className="list-unstyled">
                            <li>Şirket Bilgileri</li>
                            <li>Kariyer</li>
                            <li>Basın Merkezi</li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Takip Edin</h5>
                        <ul className="list-unstyled">
                            <li>Facebook</li>
                            <li>Twitter</li>
                            <li>Instagram</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    Yasal Bilgilendirmeler <br/> <br/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>

            </div>
        </footer>
    );
};

export default Footer;
