/*カレンダーのインポート*/
import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Text, Input, Divider, CheckBox } from "react-native-elements";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = new Storage({
  size: 370 * 4,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: this,
});

lib - Cov;

function SchedulePanel({ selectedDey }) {
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setMinute(0);
    setHour(0);
    setTitle("");
  }, [selectedDey]);

  useEffect(() => {
    const data = {
      selectedDey,
      title,
      hour,
      minute,
    };
    console.log("##", data);

    storage.save({
      key: "data-" + selectedDey,
      data,
    });
  }, [minute, hour, title]);

  const [checked, setChecked] = useState(false);
  const onPressCheckBox = () => {
    setChecked(!checked);
  };

  function TimeInput() {
    return (
      <View>
        <Input
          placeholder="時"
          value={hour.toString()}
          onChangeText={(value) => {
            setHour(Number(value));
          }}
        />
        <Text>:</Text>
        <Input
          placeholder="分"
          value={minute.toString()}
          onChangeText={(value) => {
            setMinute(Number(value));
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <Text h1>{selectedDey}</Text>
      <Divider>
        <TimeInput />
        <Input
          placeholder="予定名前"
          value={title}
          onChangeText={(value) => {
            setTitle(value);
          }}
        />
        <CheckBox
          title="マナーモードーON"
          checked={checked}
          onPress={onPressCheckBox}
        />
      </Divider>
    </View>
  );
}

/*終わり*/
/*カレンダーの本文*/
export default function App() {
  const [selected, setSelected] = useState(INITIAL_DATE);
  const handleDayPress = (day) => {
    setSelected(day.dateString);
    console.log(day);
  };

  return (
    <View style={{ paddingTop: 40 }}>
      <Calendar
        monthFormat={"yyyy年 MM月"}
        current={INITIAL_DATE}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: "pink",
            selectedTextColor: "white",
          },
        }}
        onDayPress={handleDayPress}
      />
      <SchedulePanel selectedDey={selected} />
    </View>
  );
}

LocaleConfig.locales.jp = {
  today: "今日",
  monthNames: [
    "1 月",
    "2 月",
    "3 月",
    "4 月",
    "5 月",
    "6 月",
    "7 月",
    "8 月",
    "9 月",
    "10 月",
    "11 月",
    "12 月",
  ],
  monthNamesShort: [
    "1 月",
    "2 月",
    "3 月",
    "4 月",
    "5 月",
    "6 月",
    "7 月",
    "8 月",
    "9 月",
    "10 月",
    "11 月",
    "12 月",
  ],
  dayNames: [
    "日曜日",
    "月曜日",
    "火曜日",
    "水曜日",
    "木曜日",
    "金曜日",
    "土曜日",
  ],
  dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
};
LocaleConfig.defaultLocale = "jp";

const INITIAL_DATE = moment().format("YYYY-MM-DD");
