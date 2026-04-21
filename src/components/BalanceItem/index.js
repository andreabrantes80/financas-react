import { useMemo } from "react";
import { Balance, Container, Label } from "./styles";

export default function BalanceItem({ data }) {

    const labelName = useMemo(() => {
        // Validação: se data não existe, retorna objeto padrão
        if (!data || !data.tag) {
            return {
                label: 'Sem informação',
                color: '#cccccc'
            };
        }

        if (data.tag === 'saldo') {
            return {
                label: 'Saldo atual',
                color: '#3b3dbf' // Adicionei # para manter padrão
            }
        } else if (data.tag === 'deposit') {
            return {
                label: 'Entradas de hoje',
                color: '#00b94a'
            }
        } else if (data.tag === 'withdraw') {
            return {
                label: 'Saídas de hoje',
                color: '#ef463a'
            }
        }

        // Retorno padrão se nenhuma tag corresponder
        return {
            label: 'Outro',
            color: '#999999'
        };

    }, [data])

    const amount = data?.amount || 0;

    return (
        <Container bg={labelName.color}>
            <Label>{labelName.label}</Label>
            <Balance>
                R$ {Number(amount).toFixed(2)}
            </Balance>
        </Container>
    );
}