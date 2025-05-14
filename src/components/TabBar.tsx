import { View, Platform, Text, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import {  PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Feather, Ionicons } from '@expo/vector-icons';
import TabBarButton from './TabBarButton';
import { useState } from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export function MyTabBar({ state, descriptors, navigation } : BottomTabBarProps) {
  const { colors } = useTheme();
   const [dimensions, setDimentions] = useState({ width: 100, height: 20 });
    const buttonWidth = dimensions.width / state.routes.length

    const onTabLayout = (e:LayoutChangeEvent) => {
        setDimentions({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
        })
    }

    const tabPositionX = useSharedValue(0)
    const animatedStyle = useAnimatedStyle(() => {
        // const opacity = interpolate(scale.value, [0, 1], [1, 0])
        return {
            transform: [{translateX: tabPositionX.value}]
        }
    })

    
  return (
    <View onLayout={onTabLayout} style={{ 
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        backgroundColor: '#3d3d3d',
        marginHorizontal: 35,
        paddingVertical: 15,
        borderRadius: 35,
        shadowColor: "#000000",
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.17,
        shadowRadius: 10,
        // elevation: 5,
        }}>
            <Animated.View style={[animatedStyle,{position: 'absolute', backgroundColor: '#FFF', borderRadius: 30, marginHorizontal : 12, height: dimensions.height - 25, width: buttonWidth - 25, alignSelf: 'center'}]} />
      {state.routes.map((route:any, index:any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
            tabPositionX.value = withSpring(buttonWidth*index, {duration: 1500})
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
            <TabBarButton 
                key={route.name}
                onPress={onPress}
                onLongPress={onLongPress}
                isFocused={isFocused}
                routeName={route.name}
                color = {isFocused ? "#0b25d7" : colors.text} 
                label={label}
            />
        //   <TouchableOpacity
        //   key={route.name}
        //     accessibilityRole="button"
        //     accessibilityState={isFocused ? { selected: true } : {}}
        //     accessibilityLabel={options.tabBarAccessibilityLabel}
        //     testID={options.tabBarTestID}
        //     onPress={onPress}
        //     onLongPress={onLongPress}
        //     style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 5, width: '100%' }}
        //   >
        //     {icon[route.name]({
        //         color: isFocused ? "#0b25d7" : colors.text
        //     })}
        //     <Text style={{ color: isFocused ? "#0b25d7" : colors.text }}>
        //       {label}
        //     </Text>
        //   </TouchableOpacity>
        );
      })}
    </View>
  );
}