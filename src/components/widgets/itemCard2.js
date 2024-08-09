import React, { memo } from 'react';
import { Image, StyleSheet, View, Text, FlatList } from 'react-native';
import uuid from 'react-native-uuid';
import Label3 from './label3';
import _ from 'lodash';
import CustomTouchableOpacity from '../helpers/touchableOpacity';

function ItemCard2({ data }) {
  const renderLabel = ({ item }) => <Label3 data={{ text: item.text }} />;
  const renderPrice = ({ item }) => (
    <Text style={[styles.price_usd]}>
      {item} {data.price[item]}
    </Text>
  );
  const renderParams = ({ item }) => (
    <View>
      <Text>• {item.text} </Text>
    </View>
  );

  return (
    <View>
      {data ? (
        <>
          <CustomTouchableOpacity data={data}>
            <Image
              resizeMode={'cover'}
              style={[styles.image, { width: '100%', height: 200 }]}
              source={{ uri: data.src }}
            />
            <View style={[styles.wrap_info]}>
              <Text style={[styles.title]}>{data.title}</Text>
              <Text style={[styles.sub_title]}>{data.sub_title}</Text>

              {data.price ? (
                <View style={[styles.prices_list]}>
                  <FlatList
                    data={Object.keys(data.price)}
                    numColumns={5}
                    renderItem={renderPrice}
                    listKey={uuid.v4()}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              ) : null}

              <FlatList
                data={data.labels}
                numColumns={5}
                renderItem={renderLabel}
                listKey={uuid.v4()}
                keyExtractor={(item) => item.id}
              />
              <Text>{data.date}</Text>
              <FlatList
                data={data.params}
                numColumns={5}
                renderItem={renderParams}
                listKey={uuid.v4()}
                keyExtractor={(item) => item.id}
              />
            </View>
          </CustomTouchableOpacity>
        </>
      ) : null}
    </View>
  );
}

export default memo(ItemCard2);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  sub_title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  prices_list: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 16,
  },
  price_usd: {
    color: 'green',
    fontWeight: 'bold',
    paddingRight: 10,
  },
  wrap_info: {
    paddingLeft: '3%',
    paddingRight: '3%',
  },
});
