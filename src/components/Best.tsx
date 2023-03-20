import { BestCard } from "./BestCard"

export const Best = () => {
    return (
        <div className="border-t-2 border-gray-300 rounded-md p-5">
            <h3 className="text-2xl leading-none text-center font-light text-gray-600">Mejor profesor y recurso del semestre</h3>
            <div className="flex items-center justify-center gap-3 w-full mt-5 h-full">
                <BestCard
                    imgUrl="/jhon.jpg"
                    name="John Doe"
                    rating={4.5}
                />
                <BestCard
                    imgUrl="/formula.png"
                    name="Tabla de fórmulas"
                    description="Ecuaciones diferenciales"
                    rating={5}
                />
            </div>  
        </div>
    )
}