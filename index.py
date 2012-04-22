'''
 Web OPM: online case tool for Object-Process Methodology
 Copyright 2012 Israel Institute of Technology - Technion
 The code is licensed under GNU General Public License, v2
  
 File context description:
 Main handlers URI handlers
 
 Author: Sergey N. Bolshchikov
'''

import webapp2
import jinja2

import os

jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

class IndexHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('index.html')
        self.response.out.write(template.render())

class EditorHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('editor.html')
        self.response.out.write(template.render())
        
      
app = webapp2.WSGIApplication([('/', IndexHandler),
                               ('/editor', EditorHandler)], debug = True)    
    
def main():
    app.run()
    
if __name__ == "__main__":
    main()