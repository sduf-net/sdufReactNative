import * as React from 'react';
import { VirtualizedList } from 'react-native';
import { Div } from 'react-native-magnus';
import { getItem, getItemCount } from '../../../utils';

const DivWidget = (config) => {
  const renderWidget = ({ item }) => <config.factory props={item} />;

  return (
    <Div m={15} bg="white" rounded={9} borderWidth={1} borderColor="gray300">
      <Div
        h={180}
        roundedTop={9}
        bgImg={{
          uri: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
        }}
      >
        <Div row alignItems="center" m="md">
          <Div bg="orange500" rounded="sm" px="sm" py="xs" fontSize="sm">
            <Text color="white" textTransform="uppercase" fontWeight="bold" fontSize="sm">
              Featured
            </Text>
          </Div>
          <Button bg="rgba(0, 0, 0, 0.50)" h={39} w={39} rounded="circle" ml="auto">
            <Icon fontFamily="FontAwesome" name="heart" color="white" fontSize={14} />
          </Button>
        </Div>
      </Div>
      <Div row alignItems="flex-end" p={15}>
        <Div flex={1}>
          <Text color="gray800" fontWeight="bold" fontSize="xl" mt="sm">
            $3,250
          </Text>
          <Text color="gray600" fontSize="md">
            Aparment - Yesterday
          </Text>
          <Div row alignItems="center" my="md" color="red500">
            <Text fontWeight="bold" color="gray700" mr="sm">
              1BED
            </Text>
            <Text fontWeight="bold" color="gray700" mr="sm">
              1BATH
            </Text>
            <Text fontWeight="bold" color="gray700" mr="sm">
              500 FT
            </Text>
            <Text fontWeight="bold" color="gray700" mr="sm">
              PETS
            </Text>
          </Div>
          <Text color="gray600" fontSize="md">
            2154 Broadway Ave
          </Text>
        </Div>
        <Div row alignItems="center">
          <Button
            bg="white"
            borderWidth={1}
            borderColor="blue900"
            h={39}
            w={39}
            rounded="circle"
            mr="md"
          >
            <Icon fontFamily="FontAwesome" name="share" color="blue900" fontSize={14} />
          </Button>
          <Button bg="blue500" h={39} w={39} rounded="circle">
            <Icon fontFamily="FontAwesome" name="envelope" color="white" fontSize={14} />
          </Button>
        </Div>
      </Div>
    </Div>

    // <Div {...config.data.props}>
    //   <View>
    //     {config.nestedComponents.map((item) => (
    //       <React.Fragment key={item.id}>{renderWidget(item)}</React.Fragment>
    //     ))}
    //   </View>
    // </Div>

    // <Div {...config.data.props}>
    //   <VirtualizedList
    //     data={config.nestedComponents}
    //     renderItem={renderWidget}
    //     keyExtractor={(item) => item.id}
    //     getItemCount={getItemCount}
    //     getItem={getItem}
    //   />
    // </Div>
  );
};

export default DivWidget;
