```javascript
// cameraBugSolution.js
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';

// ... other imports

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;  //Show a loading view or similar
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleLongTask = async () => {
    // Simulate a long-running task using a timer and a promise, run in background
    await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate 5-second delay
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View
          style={styles.buttonContainer}>
          <Button title="Flip Camera" onPress={() => {
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            );
          }} />
          <Button title="Run Long Task" onPress={handleLongTask} />
        </View>
      </Camera>
    </View>
  );
};
```