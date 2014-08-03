import sys
import logging

from cement.core import foundation, controller, handler
from cement.utils import misc

logo_ascii = """
           _   _                         _            _
 _ __ _  _| |_| |_  ___ _ _ ___ __ _ _ _| |_ _ _  ___| |_ 
| '_ \ || |  _| ' \/ _ \ ' \___/ _` | '_|  _| ' \/ -_)  _|
| .__/\_, |\__|_||_\___/_||_|  \__,_|_|  \__|_||_\___|\__|
|_|   |__/
"""

defaults = misc.init_defaults('base')
defaults['base']['address'] = '<broadcast>'

log = logging.getLogger(__name__)

def run(name, config, controller=None):
	mod = __import__('artnet.scripts', globals(), locals(), [name], -1)
	try:
		getattr(mod, name).main(config, controller)
	except AttributeError, e:
		import traceback
		traceback.print_exc()
		log.error("Couldn't find lighting script named %r" % name)
	
class ArtnetBaseController(controller.CementBaseController):
	class Meta:
		label = 'base'
		usage = 'artnet <command> [options]'
		interface = controller.IController
		description = "%s\nBasic artnet protocol support." % logo_ascii
		
		arguments = [
			(['-a', '--address'], dict(action='store', help='Address of an artnet interface.')),
		]
	
	@controller.expose(hide=True)
	def default(self):
		self.app.args.print_help()

	@controller.expose(help="Send a blackout command to a particular interface.")
	def blackout(self):
		from artnet.scripts import all_channels_blackout as blackout
		blackout.main(self.app.config)
	
	@controller.expose(help="A custom Python shell with an Artnet controller already running and some sample commands.")
	def shell(self):
		from artnet.scripts import shell
		shell.main(self.app.config)

	@controller.expose(help="Run a listener to observe ArtNet traffic (useful for debugging).")
	def listen(self):
		from artnet.scripts import listener
		listener.main(self.app.config)

class ArtnetScriptController(controller.CementBaseController):
	class Meta:
		label = 'script'
		usage = 'artnet script [options ...] <scriptname>'
		stacked_on = 'base'
		stacked_type = 'nested'
		description = "Run a standalone script from the python-artnet distribution."
		arguments = [
			(['scriptname'], dict(action='store', help='Name of script to run.')),
		]

	@controller.expose(help="Run a named lighting script.", hide=True)
	def default(self):
		run(self.app.pargs.scriptname, self.app.config)

class ArtnetApp(foundation.CementApp):
	class Meta:
		label = 'artnet'
		config_defaults = defaults
		arguments_override_config = True
		base_controller = ArtnetBaseController

def main():
	logging.basicConfig(format="%(asctime)s (%(levelname)s) %(message)s", level='INFO')
	app = ArtnetApp()
	handler.register(ArtnetBaseController)
	handler.register(ArtnetScriptController)
	
	try:
		app.setup()
		app.run()
	finally:
		app.close()