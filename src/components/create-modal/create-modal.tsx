import { useEffect, useState } from 'react'
import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';
import type { FoodData } from '../../interface/FoodData';
import './modal.css';


interface InputProps{
    label: string,
    value: string | number,
    updateValue(value: any): void
}

interface ModalProps{
    closeModal(): void
}
    

const Input = ({ label, value, updateValue } : InputProps) => {
    return (
        <>
            <label>{ label }</label>
            <input value={ value } onChange={event => updateValue(event.target.value) }></input>
        </>
    )
}

export function CreateModal({ closeModal }: ModalProps){
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate, isSuccess, isPending} = useFoodDataMutate();

    const submit = () => {

        const foodData: FoodData = {
            title,
            price,
            image
        }
        mutate(foodData)
    }

    useEffect(() => {
        if(!isSuccess) return
        closeModal();
        
    }, [isSuccess])

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <button className="close-btn" onClick={closeModal}>X</button>
                <h2>CADASTRE UM NOVO ITEM</h2>
                <form className="input-container">
                    <Input label= "titulo" value={title} updateValue={setTitle}/>
                    <Input label= "preço" value={price} updateValue={setPrice}/>
                    <Input label= "imagem (url)" value={image} updateValue={setImage}/>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isPending ? "postando..." : "postar"}
                </button>

            </div>
        </div>
    )
}