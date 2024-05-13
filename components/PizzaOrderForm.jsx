import { useState } from "react"
import "./PizzaOrderForm.css"

const fakeAdditivesList = [
    { id: 1, name: "Peynir" },
    { id: 2, name: "Pepperoni" },
    { id: 3, name: "Sosis" },
    { id: 4, name: "Domates" },
    { id: 5, name: "Mısır" },
    { id: 6, name: "Biber" },
    { id: 7, name: "Sucuk" },
    { id: 8, name: "Kanada Jambonu" },
    { id: 9, name: "Tavuk" },
    { id: 10, name: "Soğan" },
    { id: 11, name: "Kabak" },
    { id: 12, name: "Mantar" },
    { id: 13, name: "Sarımsak" },
    { id: 14, name: "Sos" },
]


export default function PizzaOrderForm() {
    const [doughThickness, setDoughThickness] = useState("");
    const [size, setSize] = useState("");
    const [additives, setAdditives] = useState([]);
    const [orderNotes,setOrderNotes]=useState("");
    const [quantity ,setQuantity]=useState(1);

    const handleDoughThicknessChange = (event) => {
        setDoughThickness(event.target.value);
    }
    const handleSizeChange = (event) => {
        setSize(event.target.value);
    }
    const handleAdditivesChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            if (additives.length <= 10) {
                setAdditives([...additives, value])
            } else {
                alert("Maksimum 10 ekstra malzeme seçebilirsiniz!")
            }
        } else {
            setAdditives(additives.filter(additives => additives !== value));//!!!!!
        }
    };
    const handleOrderNotesChange=(event)=>{
        setOrderNotes(event.target.value);
    }
    const handleQuantityChange = (value)=>{
        setQuantity(prevQuantity => Math.max(1,prevQuantity + value))
    };
    const calculateTotalPrice = (selection)=>{
        let basePrice = 90;
        if (size === "orta") {
            basePrice += 10;
        }else if (size === "büyük") {
            basePrice += 15;
        }
        const additivesPrice=5;
        const totalAdditivesPrice = additives.length * additivesPrice;
        const totalPrice = totalAdditivesPrice + basePrice;
        if (selection==="additives") {
            return totalAdditivesPrice;
        }else{
            return totalPrice * quantity;
        }
       

    }
    return (<form >
        <section class="main-form-component">
            <section class="dough-size">
        <div class="container-1">
            <h2>Boyut Seçin</h2>
            <label>Küçük
                <input
                    type="checkbox"
                    value="küçük"
                    checked={size === "küçük"}
                    onChange={handleSizeChange}
                />
            </label>
            <label>Orta <input
                type="checkbox"
                value="orta"
                checked={size === "orta"}
                onChange={handleSizeChange} /></label>
            <label>
                Büyük
                <input
                    type="checkbox"
                    value="büyük"
                    checked={size === "büyük"}
                    onChange={handleSizeChange}
                />
            </label>
        </div>
        <div class="container-1">
            <h2>Hamur Seç</h2>
            <select value={doughThickness} onChange={handleDoughThicknessChange}>
                <option value="">Hamur Kalınlığı</option>
                <option value="ince">İnce</option>
                <option value="normal">Normal</option>
                <option value="kalın">Kalın</option>
            </select>
        </div></section>
        <div class="container">
            <h2>Ek Malzemeler</h2>
            <p>En Fazla 10 malzeme seçebilirsiniz.5$</p>
            {fakeAdditivesList.map(item => (<label key={item.id}>
                {item.name}
                <input type="checkbox"
                    value={item.name.toLocaleLowerCase()}
                    checked={additives.includes(item.name.toLocaleLowerCase())}
                    onChange={handleAdditivesChange} 
                    />
            </label>))}

        </div>
        <div class="container">
            <h2>Sipariş Notu</h2>
            <textarea value={orderNotes} onChange={handleOrderNotesChange} />
        </div>
        <div class="container">
            <div >
                <button type="button" onClick={()=>handleQuantityChange(-1)}>-</button>
                <input type="number"
                    min="1"
                    value={quantity}
                    onChange={(e)=> setQuantity(parseInt(e.target.value))}
                
                />
                <button type="button" onClick={()=>handleQuantityChange(+1)}>+</button>
            </div>
        </div>
        <div class="container">
            <h3>Siparişler Toplamı</h3>
            <h4>Seçimler: </h4>
            <h4>{calculateTotalPrice("additives")}</h4>
            <h4 >Toplam : </h4>
            <h4>{calculateTotalPrice()}</h4>
        </div>
        <div class="container">
            <button type="submit">Sipariş Ver</button>
        </div></section>
    </form>)
}