import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./Header.css"


export default function Banner(props){
    const history = useHistory();


    return(
        <header>
        <h1>Teknolojik Yemekler</h1>
        <nav>
        <li><a href="#">-Ana Sayfa</a></li>
        <li><a href="#">-Seçenekler</a></li>
        <li><a href="#">-Sipariş Oluştur</a></li>
        </nav>
        </header>
    );
}