import styled from "styled-components/native";

export const Background = styled.SafeAreaView`
  flex: 1;
  background-color: #f0f4ff;
`;

export const Area = styled.View`
  margin-top: 24px;
  background-color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 14px;
  flex: 1;
`;

export const Title = styled.Text`
  color: #121212;
  margin-bottom: 14px;
  font-weight: bold;
  font-size: 18px;
`;

export const List = styled.FlatList`
  flex: 1;
`;

export const GoalItem = styled.View`
  background-color: #f0f2ff;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 12px;
`;

export const GoalTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #121212;
`;

export const GoalValue = styled.Text`
  margin-top: 4px;
  color: #3b3dbf;
  font-weight: bold;
`;

export const GoalInfo = styled.Text`
  font-size: 13px;
  color: #555;
  margin-top: 2px;
`;

export const ProgressBar = styled.View`
  margin-top: 8px;
  height: 8px;
  background-color: #ddd;
  border-radius: 5px;
`;

export const Progress = styled.View`
  height: 100%;
  background-color: #3b3dbf;
  border-radius: 5px;
`;