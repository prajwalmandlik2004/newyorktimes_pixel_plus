import React from 'react';
import { Link } from 'react-router-dom';

type SidebarWidgetProps = {
  title: string;
  items: {
    title: string;
    link: string;
  }[];
};

const SidebarWidget = ({ title, items }: SidebarWidgetProps) => {
  return (
    <div className="mb-8">
      <h3 className="headline-md border-b border-black pb-2 mb-4">{title}</h3>
      
      <ol className="list-decimal list-inside space-y-4 pl-1">
        {items.map((item, index) => (
          <li key={index} className="group">
            <Link to={item.link} className="pl-2 hover:text-gray-700 transition-colors">
              {item.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default SidebarWidget;