import './youtube.module.css';

export interface YoutubeProps {
  title: string;
  uid: string;
}

export function Youtube({ title, uid }: YoutubeProps) {
  return (
    <div className="my-3 mx-1">
      <iframe
        src={`https://www.youtube.com/embed/${uid}`}
        width="100%"
        height="500px"
        title={title}
      />
    </div>
  );
}

export default Youtube;
