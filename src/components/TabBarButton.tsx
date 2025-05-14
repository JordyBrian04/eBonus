import { View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { icon } from '../constants/icon'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { AnimatedText } from 'react-native-reanimated/lib/typescript/component/Text'
import { colors } from '../utils/colors'

type TabBarButtonProps = {
    onPress: (event: any) => void;
    onLongPress: (event: any) => void;
    isFocused: boolean;
    routeName: string;
    color: string;
    label: string;
}

const TabBarButton = ({onPress, onLongPress, isFocused, routeName, color, label}: TabBarButtonProps) => {
  
    const scale = useSharedValue(0)

    useEffect(() => {
        scale.value = withSpring(
            typeof isFocused === 'boolean' ? 
            (isFocused ? 1 : 0) : isFocused, 
            {duration: 350}
        )
    }, [scale, isFocused])

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1, 0])
        return {
            opacity
        }
    })

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2])
        const top = interpolate(scale.value, [0, 1], [1, 9])
        return {
            transform: [{scale: scaleValue}],
            top
        }
    })
  
    return (
    <Pressable
    // key={route.name}
    //   accessibilityRole="button"
    //   accessibilityState={isFocused ? { selected: true } : {}}
    //   accessibilityLabel={options.tabBarAccessibilityLabel}
    //   testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 5, width: '100%' }}
    >
        <Animated.View style={animatedIconStyle}>

            {icon[routeName]({
                color: isFocused ? colors.primary : "#fff"
            })}
        </Animated.View>
      <Animated.Text style={[{ color: isFocused ? colors.primary : "#fff", fontSize: 12 }, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </Pressable>
  )
}

export default TabBarButton