import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Home from './src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateTask from './src/screens/CreateTask';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Tasks" 
        component={Home}
        options={({navigation}) => ({
          headerRight: () => (
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Create Tasks")}>
              <Ionicons name={'add-outline'}
              size={34}
              color={'blue'}
              style={{marginRight: 10}}
              />
            </TouchableWithoutFeedback>
          )
        })}
        />
        <Stack.Screen name="Create Tasks" component={CreateTask}/>
        {/* <Stack.Screen name="Update-Tasks" component={UpdateTasks}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
