// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { Dimensions, View, Text, StyleSheet } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'

import mapMarker from '../images/Local.png'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import api from '../services/api'

interface Orphanage {
  id: number
  latitude: string
  longitude: string
  name: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function OrphanagesMap() {
  const navigation = useNavigation()
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])
  useFocusEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data)
    })
  })

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition')
  }

  function handleNavigateToOrphanageDeatails(id: number) {
    navigation.navigate('OrphanageDetails', { id })
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -31.7574627,
          longitude: -52.3719938,
          longitudeDelta: 0.008,
          latitudeDelta: 0.008,
        }}
      >
        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              icon={mapMarker}
              coordinate={{
                latitude: parseFloat(orphanage.latitude),
                longitude: parseFloat(orphanage.longitude),
              }}
            >
              <Callout
                tooltip={true}
                onPress={() => handleNavigateToOrphanageDeatails(orphanage.id)}
              >
                <View style={styles.calloutConteiner}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanatos encontrados
        </Text>
        <RectButton
          style={styles.createOrphanageButton}
          onPress={() => handleNavigateToCreateOrphanage()}
        >
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutConteiner: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    justifyContent: 'center',

    elevation: 3,
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    padding: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },

  footerText: {
    color: '#8fa7b3',
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },
})
