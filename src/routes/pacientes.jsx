import { useState } from "react";
import GradientBorderButton from "../components/UI/GradientButton";
import FormularioPaciente from "../components/FormularioPaciente";
import FichaClinica from "../components/FichaClinica";

export default function Pacientes() {
    const [isOpen, setIsOpen] = useState(false);

    const [pacientes, setPacientes] = useState([
        {
            nombre: "pegamento",
            especie: "perro",
            edad: "12",
            raza: "mestizo",
            motivo: "se cayo y se pego",
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5K9bMLje8lyz6Kpk97MzwOZrh5PAlLXkZoj4-Q8DWKg&s=10",
        },
    ]);

    function agregarPaciente(nuevoPaciente) {
        setIsOpen(false);
        setPacientes((listaActual) => [
            ...listaActual,
            { ...nuevoPaciente, id: crypto.randomUUID() },
        ]);
    }

    return (
        <div className="flex flex-col h-full max-h-screen">
            <div className="grid grid-cols-4 h-auto">
                {pacientes.map((paciente, index) => {
                    return <FichaClinica key={index} paciente={paciente} />;
                })}
            </div>

            <GradientBorderButton
                onPress={() => setIsOpen(true)}
                type="action"
                buttonText="Ingresar Pacientes"
            />

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
                    onClick={() => setIsOpen(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <FormularioPaciente onSubmit={agregarPaciente} />
                    </div>
                </div>
            )}
        </div>
    );
}