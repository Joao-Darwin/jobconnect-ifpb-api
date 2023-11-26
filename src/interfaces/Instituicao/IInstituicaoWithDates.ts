import IInstituicao from "./IInstituicao";

interface IInstituicaoWithDates extends IInstituicao {
    created_at: Date,
    updated_at: Date
}

export default IInstituicaoWithDates;