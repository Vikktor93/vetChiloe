import { useState } from "react";

const imagenesPorEspecie = {
    perro: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5K9bMLje8lyz6Kpk97MzwOZrh5PAlLXkZoj4-Q8DWKg&s=10",
    gato: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_tGFXnJruodcIwFf8xFENi3SiQjodb1F1M-w-gk180w&s=10",
};

const FormularioPaciente = ({ onSubmit }) => {
    const [paciente, setPaciente] = useState({
        nombre: "",
        especie: "",
        edad: "",
        raza: "",
        motivo: "",
        imagen: ""
    });


    const handleChange = (event) => {
        const { name, value, type } = event.target;
        if (type === "number" && value !== "" && Number(value) < 0) {
            return;
        }

        setPaciente((pacienteActual) => ({
            ...pacienteActual,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const especie = paciente.especie.trim().toLowerCase();
        onSubmit({
            ...paciente,
            imagen: imagenesPorEspecie[especie] ?? paciente.imagen,
        });
    };

    return (
        <form className="flex flex-col w-3xs bg-amber-50 " onSubmit={handleSubmit}>
            <fieldset>
                <legend className="mb-3.5">Paciente</legend>
                <label>
                    Ingresar el nombre del paciente
                    <input
                        className="border-2 border-amber-50 text-[#FFFFFF]"
                        type="text"
                        name="nombre"
                        value={paciente.nombre}
                        onChange={handleChange}
                    />
                </label>
                <label className="flex flex-col ">
                    Especie
                    <select
                        className="border-2 border-amber-50 text-[#FFFFFF]"
                        name="especie"
                        value={paciente.especie}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Selecciona una especie</option>
                        <option value="perro">perro</option>
                        <option value="gato">gato</option>
                    </select>
                </label>
                <label>
                    Edad
                    <input
                        className="border-2 border-amber-50 text-[#FFFFFF]"
                        type="number"
                        name="edad"
                        value={paciente.edad}
                        min="0"
                        step="any"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Raza
                    <input
                        className="border-2 border-amber-50 text-[#FFFFFF]"
                        type="text"
                        name="raza"
                        value={paciente.raza}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Motivo de consulta
                    <input
                        className="border-2 border-amber-50 text-[#FFFFFF]"
                        type="text"
                        name="motivo"
                        value={paciente.motivo}
                        onChange={handleChange}
                    />
                </label>
            </fieldset>
            <button type="submit">Registrar paciente</button>
        </form>
    );
};

export default FormularioPaciente;
