import { useState } from "react"
import "./PizzaOrderForm.css"
import axios from "axios";

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
    const [orderNotes, setOrderNotes] = useState("");
    const [quantity, setQuantity] = useState(1);

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
    const handleOrderNotesChange = (event) => {
        setOrderNotes(event.target.value);
    }
    const handleQuantityChange = (value) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + value))

    };
    const calculateTotalPrice = (selection) => {
        let basePrice = 90;
        if (size === "orta") {
            basePrice += 10;
        } else if (size === "büyük") {
            basePrice += 15;
        }
        const additivesPrice = 5;
        const totalAdditivesPrice = additives.length * additivesPrice;
        const totalPrice = totalAdditivesPrice + basePrice;
        if (selection === "additives") {
            return totalAdditivesPrice;
        } else {
            return totalPrice * quantity;
        }


    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'https://reqres.in/api/pizza',
            data: {
                doughThickness,
                size,
                additives,
                orderNotes,
                quantity,
                totalPrice: calculateTotalPrice()
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.error(error)
            })

    }
    return (
        <form >
            <section class="main-form-component">
                <section class="text-area">
                    <div>
                        <h2>Position Absolute Acı Pizza</h2>
                        <h2>{calculateTotalPrice() + " TL"}</h2>
                        <p>Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre.
                            Pizza,domates,peynir ve genellikle .eşitli diğer malzemelerle kaplanmış , daha sonra geleneksel
                            olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak,düzleştirilmiş
                            mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizetta denir.
                        </p>
                    </div>
                </section>
                <section class="dough-size">
                    <div class="container-1">
                        <h2>Boyut Seçin</h2><div>
                            <input
                                type="radio"
                                value="küçük"
                                checked={size === "küçük"}
                                onChange={handleSizeChange}
                                id="size1"
                                class="size"
                            />
                            <label htmlFor="size1">Küçük</label></div>
                        <div>
                            <input
                                type="radio"
                                value="orta"
                                checked={size === "orta"}
                                onChange={handleSizeChange}
                                id="size2"
                                class="size" />
                            <label htmlFor="size2">Orta</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                value="büyük"
                                checked={size === "büyük"}
                                onChange={handleSizeChange}
                                id="size3"
                                class="size"
                            />
                            <label htmlFor="size3">
                                Büyük
                            </label></div>
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
                <section class="additives-area">
                    <h2>Ek Malzemeler</h2>
                    <p>En fazla 10 malzeme seçebilirsiniz. 5$</p>
                    <div class="container-2">
                        <div class="additives-columns">
                            {fakeAdditivesList.map(item => (
                                <div key={item.id} class="additive-item">
                                    <label class="checkbox-container">
                                        <input
                                            type="checkbox"
                                            value={item.name.toLocaleLowerCase()}
                                            checked={additives.includes(item.name.toLocaleLowerCase())}
                                            onChange={handleAdditivesChange}
                                            class="checkbox"
                                        />
                                        <span>{item.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div class="order-note-container">
                    <h2>Sipariş Notu</h2>
                    <textarea  value={orderNotes} onChange={handleOrderNotesChange} />
                </div>
                <br /><br /><hr /><br /><br />
                <section class="quantity-sum-card">
                    <div>
                        <div class="quantity-selector">
                            <button type="button" class="quantity-selector-button" onClick={() => handleQuantityChange(-1)}>-</button>
                            <input type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}

                            />
                            <button type="button" class="quantity-selector-button" onClick={() => handleQuantityChange(+1)}>+</button>
                        </div>
                    </div>
                    <div class="order-price-card">
                        <h3 style={{fontWeight:"bold",fontSize:"30px"}}>Siparişler Toplamı</h3>
                        <div id="row-sum-card" class="price-item">
                            <div>
                                <h5 style={{ fontWeight: "bold", fontSize: "25px" }}>Seçimler: </h5>
                                <h5 style={{ fontWeight: "bold", fontSize: "20px" }} >{calculateTotalPrice("additives")} TL</h5>
                            </div>
                            <div>
                                <h5 style={{ fontWeight: "bold", fontSize: "25px", color: "red" }}>Toplam : </h5>
                                <h5 style={{ fontWeight: "bold", fontSize: "20px", color: "red" }}>{calculateTotalPrice()} TL</h5>
                            </div>
                        </div>
                        <hr />
                        <div class="submit-button">
                            <button type="submit" onClick={handleSubmit} class="full-width-button">Sipariş Ver</button>
                        </div>
                    </div>

                </section>
            </section>
        </form>)
}