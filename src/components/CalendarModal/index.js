import { useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ptBr } from './localeCalendar';
import { ButtonFilter, ButtonFilterText, Container, ModalContent } from "./styles";

LocaleConfig.locales['pt-br'] = ptBr;
LocaleConfig.defaultLocale = 'pt-br';

export default function CalendarModal({ setVisible, handleFilter }) {

    const [dateNow, setDateNow] = useState(new Date());
    const [markedDates, setMarkedDates] = useState({})

    function handleOnDayPress(date) {
        // Parse the date string correctly using date-fns to avoid timezone issues
        // const parsedDate = parse(date.dateString, 'yyyy-MM-dd', new Date());
        // setDateNow(parsedDate);

        const [year, month, day] = date.dateString.split('-');

        const parsedDate = new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        );

        setDateNow(parsedDate);

        let markedDate = {};
        markedDate[date.dateString] = { selected: true, selectedColor: '#3b3dbf', textColor: '#fff' }
        setMarkedDates(markedDate);


    }

    function handleFilterDate() {
        handleFilter(dateNow);
        setVisible();
    }

    return (
        <Container>

            <TouchableWithoutFeedback onPress={setVisible} >

                <View style={{ flex: 1 }}></View>
            </TouchableWithoutFeedback>

            <ModalContent>

                <Calendar
                    onDayPress={handleOnDayPress}
                    markedDates={markedDates}
                    enableSwipeMonths={true}
                    theme={{
                        todayTextColor: '#ff0000',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#fff'
                    }}

                />

                <ButtonFilter  onPress={handleFilterDate} >
                    <ButtonFilterText>Filtrar</ButtonFilterText>
                </ButtonFilter>

            </ModalContent>


        </Container>
    )
}