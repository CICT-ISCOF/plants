import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';

// COMPONENTS
import Splash from './components/splash/splash';
import Home from './components/home/home';
import Plantitos from './components/plantitos-plantitas/plantitos-plantitas'
import Categories from './components/show-category/show-category'
import CommonPlantPests from './components/show-common-plant-pets/CommonPlantPests'
import PlantDiseaseandDisorders from './components/show-plant-disease-and-disorders/PlantDiseaseandDisorders'
import HelpfulTips from './components/helpful-tips/helpful-tips'
import PlantInformation from './components/plant-information/index'
import ShowSpeciifcPlantInformation from './components/plant-information/show/show'
import LayoutIdeas from './components/plant-information/show/layout-ideas/layout-ideas'
import Guide from './components/plant-information/show/guide/guide'
import PlantitosGuide from './components/plantitos-plantitas/guide/guide'
import VarietiesPlantitos from './components/plantitos-plantitas/varieties/varieties'
import Tips from './components/helpful-tips/tip'
import ShowHelpfulTips from './components/helpful-tips/helpful-tips.show'
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import theme from './constants/color'



export default function App() {
	const themState = useColorScheme();
	theme.themState = themState	
	return (
		<AppearanceProvider>
			<Router>
				<Stack key="root">
					<Scene    key="Splash" initial={true} component={Splash} hideNavBar={true} />
					<Scene    key="Home" component={Home} hideNavBar={true} />
					<Scene    key="Plantitos" component={Plantitos} hideNavBar={true} />
					<Scene    key="Categories" component={Categories} hideNavBar={true} />
					<Scene    key="CommonPlantPests" component={CommonPlantPests} hideNavBar={true} />
					<Scene    key="PlantDiseaseandDisorders" component={PlantDiseaseandDisorders} hideNavBar={true} />
					<Scene    key="HelpfulTips" component={HelpfulTips} hideNavBar={true} />
					<Scene    key="PlantInformation" component={PlantInformation} hideNavBar={true} />
					<Scene    key="ShowSpeciifcPlantInformation" component={ShowSpeciifcPlantInformation} hideNavBar={true} />
					<Scene    key="LayoutIdeas" component={LayoutIdeas} hideNavBar={true} />
					<Scene    key="Guide" component={Guide} hideNavBar={true} />
					<Scene    key="PlantitosGuide" component={PlantitosGuide} hideNavBar={true} />
					<Scene    key="VarietiesPlantitos" component={VarietiesPlantitos} hideNavBar={true} />
					<Scene    key="Tips" component={Tips} hideNavBar={true} />
					<Scene    key="ShowHelpfulTips" component={ShowHelpfulTips} hideNavBar={true} />
				</Stack>
			</Router>
		</AppearanceProvider>
	);
}
