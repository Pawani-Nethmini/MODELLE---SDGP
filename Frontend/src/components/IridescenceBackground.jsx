import Iridescence from './Iridescence';

/**
 * Fixed iridescent background that stays in place while content scrolls over it
 * Add this component once at the root level of your app
 */
export default function IridescenceBackground() {
  return (
    <div className="iridescence-background-wrapper">
   <Iridescence
  color={[0.02, 0.05, 0.2]}
  speed={0.3}
  amplitude={0.08}
  mouseReact={true}
/>
    </div>
  );
}