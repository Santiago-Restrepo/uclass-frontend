import { useAuthFetch } from "@/hooks/useAuthFetch"
import { BestCard } from "./BestCard"
//Types
import { Teacher } from "@/types/teacher"
import { Resource } from "@/types/resource"
//Props
interface BestProps {
    teacher: Teacher;
    resource: Resource;
}
export const Best = ({
    teacher,
    resource
}: BestProps) => {
    return (
        <div className="border-t-2 border-gray-300 rounded-md p-5">
            <h3 className="text-2xl leading-none text-center font-light text-gray-600">Mejor profesor y recurso del semestre</h3>
            <div className="flex items-center justify-center gap-3 w-full mt-5 h-full">
                {
                    teacher && (
                        <BestCard
                            imgUrl={teacher.photo || "/jhon.jpg"}
                            name={teacher.name}
                            rating={teacher.rating}
                        />
                    )
                }
                {
                    resource && (
                        <BestCard
                            imgUrl={resource.imgUrl || "/formula.png"}
                            name={resource.name}
                            description={resource.description}
                            rating={resource.rating}
                        />
                    )
                }
            </div>  
        </div>
    )
}