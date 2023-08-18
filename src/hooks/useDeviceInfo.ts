import {useEffect, useState} from 'react';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';

const useDeviceInfo = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [ip, setIp] = useState('');

  useEffect(() => {
    const getDeviceId = async () => {
      const response = await DeviceInfo.getUniqueId();
      if (response) {
        setId(response);
      }
    };

    const getDeviceName = async () => {
      const resp = await DeviceInfo.getDeviceName();
      if (resp) {
        setName(resp);
      }
    };

    const getIpAddress = () => {
      NetInfo.fetch().then(state => {
        if (state) {
          // @ts-ignore
          setIp(state?.details?.ipAddress);
        }
      });
    };

    getDeviceId();
    getDeviceName();
    getIpAddress();
  }, []);

  return {
    // this may trigger app removal from app store.
    deviceId: id,
    deviceName: name,
    osVersion: DeviceInfo.getSystemVersion(),
    os: DeviceInfo.getSystemName(),
    ip,
  };
};

export default useDeviceInfo;
