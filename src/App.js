import React,
{ useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
function App() {
	const [file, setFile] = useState(null);
	const [selectedRatio, setSelectedRatio] = useState('16:9');
	const commonRatios = {
		"16:9": [1920, 1080],
		"5:4": [1280, 1024],
		"4:3": [1024, 768],
		"HD": [1080, 720],
		"3:2": [1440, 960],
		"8K": [7680, 4320],
		"5K": [5120, 2880],
		"4K": [3840, 2160],
		"Retina": [2048, 1536],
		"iPhone6plus": [1920, 1080],
		"iPhone6": [1334, 750],
		"iPhone5": [1136, 640],
		"iPad": [1024, 768],
		"Twitter": [1024, 512],
		"WebBanner": [728, 90],
		"VGA": [640, 480],
		"HVGA": [320, 480],
	};
	const [selectedWidth, setSelectedWidth] =
		useState(commonRatios[selectedRatio][0]);
	const [selectedHeight, setSelectedHeight] =
		useState(commonRatios[selectedRatio][1]);
	const handleFileChange = (e) => {
		const uploadedFile = e.target.files[0];
		setFile(URL.createObjectURL(uploadedFile));
	};
	const downloadImage =
		() => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			canvas.width = selectedWidth;
			canvas.height = selectedHeight;
			const img = new Image();
			img.src = file;
			img.onload =
				() => {
					ctx.drawImage(
						img, 0, 0,
						selectedWidth,
						selectedHeight);
					canvas.toBlob(
						(blob) => {
							const url = URL.createObjectURL(blob);
							const a = document.createElement('a');
							a.href = url;
							a.download = 'resized_image.png';
							a.click();
						}, 'image/png');
				};
		};
	return (
		<Container className="container">
			<h1>
				GeeksforGeeks Aspect Ratio
				Calculator with Live Preview
			</h1>
			<Row className="image-input">
				<Col>
					<Form.Group controlId="customImage">
						<Form.Label className="label-text">
							Upload an image:
						</Form.Label>
						<Form.Control
							type="file"
							onChange={handleFileChange}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row className="common-ratio">
				<Col>
					<Form.Group controlId="commonRatios">
						<Form.Label className="label-text">
							Select Common Ratio:
						</Form.Label>
						<Form.Control
							as="select"
							onChange={
								(e) => {
									setSelectedRatio(e.target.value);
									const [width, height] =
										commonRatios[e.target.value];
									setSelectedWidth(width);
									setSelectedHeight(height);
								}}
							value={selectedRatio}>
							{
								Object.keys(commonRatios)
									.map(
										(ratio) => (
											<option key={ratio}
												value={ratio}>
												{ratio}
												({
													commonRatios[ratio][0]
												}x{commonRatios[ratio][1]})
											</option>
										))
							}
						</Form.Control>
					</Form.Group>
				</Col>
			</Row>
			<Row className="image-container">
				<Col>
					<img
						id="previewImage"
						src={file || 'logo192.png'}
						alt="Preview Image"
						width={selectedWidth}
						height={selectedHeight}
					/>
				</Col>
			</Row>
			<Row>
				<Col>
					<Button onClick={downloadImage}>
						Download Image
					</Button>
				</Col>
			</Row>
		</Container>
	);
}
export default App;


//import logo from './logo.svg';
//import './App.css';

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
