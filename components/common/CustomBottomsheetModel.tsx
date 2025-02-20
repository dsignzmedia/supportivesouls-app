import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';

const { height } = Dimensions.get('window');

interface Props {
  children: React.ReactNode;
  bottomSheetRef: React.RefObject<BottomSheetModal>;
  snapPoints: (string | number)[]; // Accept snapPoints as a prop
  showHandleIndicator?:boolean;
  initialIndex?: number;
}

const CustomBottomsheetModel: React.FC<Props> = ({ children, bottomSheetRef, initialIndex, snapPoints = ['25%', '50%', height+300], showHandleIndicator=true }) => {
  // Use height percentages as numeric values for more consistency

  const handleDismiss = useCallback(() => {
    console.log('Dismiss button pressed');
  }, []);

  const handleSheetChange = useCallback(
        (index: any) => {
          if (index >= 0 && index < snapPoints.length) {
            console.log(`Sheet changed to index: ${index}`);
          }else{
            bottomSheetRef.current?.snapToIndex(1);
          }
        },
        [snapPoints, bottomSheetRef]
      );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1} // Hides backdrop when fully closed
        appearsOnIndex={1} // Shows backdrop starting from second snap point
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={ initialIndex }
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      enableDismissOnClose={true}
      style={styles.bottomsheetModel}
      enableOverDrag={true}
      onDismiss={handleDismiss}
      handleIndicatorStyle={showHandleIndicator ? { backgroundColor: '#E2E2E2' } : { display:'none' }} // Conditional styling
      backdropComponent={renderBackdrop}
      handleComponent={showHandleIndicator ? undefined : () => null}
    >
      <BottomSheetScrollView 
      // style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        bounces={false}
        showsVerticalScrollIndicator={true}
      >
      <BottomSheetView>

        {/* Render the children here */}
        {children}
      </BottomSheetView>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  bottomsheetModel: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
    // backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden', // Ensures content respects border radius
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },

});

export default CustomBottomsheetModel;


