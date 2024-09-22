import React, { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import CustomTouchableOpacity from '../../helpers/touchableOpacity';

function Header({ data }) {
  return (
    <View>
      {data ? (
        <View style={[styles.container, { backgroundColor: data?.style?.background }]}>
          <CustomTouchableOpacity data={data.images[0]}>
            {data.images[0].src ? (
              <Image source={{ uri: data.images[0].src }} style={[styles.img]} />
            ) : null}
          </CustomTouchableOpacity>
          <Text style={[styles.title]}>{data.title}</Text>
          <View style={[styles.subContainer]}>
            <CustomTouchableOpacity data={data.images[1]}>
              {data.images[1].src ? (
                <Image source={{ uri: data.images[1].src }} style={[styles.img]} />
              ) : null}
            </CustomTouchableOpacity>

            <CustomTouchableOpacity data={data.images[2]}>
              {data.images[2].src ? (
                <Image source={{ uri: data.images[2].src }} style={[styles.img]} />
              ) : null}
            </CustomTouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
}

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingLeft: 8,
    paddingRight: 8,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
  },
  img: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: '5%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 18,
  },
});
