[![Build Status](https://travis-ci.com/nkakouros-original/ansible-role-conntrack-logging.svg?branch=master)](https://travis-ci.com/nkakouros-original/ansible-role-conntrack-logging)
[![Galaxy](https://img.shields.io/badge/galaxy-nkakouros.conntrack-logging-blue.svg)](https://galaxy.ansible.com/nkakouros/conntrack-logging/)

ansible-role-conntrack-logging
=========

Installs and configures logging for conntrack table entries into systemd's
journal.

Description
-----------

This role will install a systemd service file and a timer to periodically
harvest the conntrack table entries into systemd's journal.

In case you need it, it also includes (in [vars/main.yml](vars/main.yml))
a sample configuration for
[journalbeat](https://www.elastic.co/guide/en/beats/journalbeat/current/index.html)
that will log conntrack entries into elasticsearch.


Requirements
------------

None

Dependencies
------------

None

Role Variables
--------------

Look at the [defaults/main.yml](defaults/main.yml) file for this roles variables and their
documentation.

Comparison with other roles
---------------------------

If you need more control over the conntrack tools, you can use other ansible
roles in parallel with this one:

- https://github.com/mrlesmithjr/ansible-conntrackd to install/configure
  conntrackd
- https://github.com/Oefenweb/ansible-conntrack to configure the conntrack
  subsystem

Example Playbook
----------------

For an example playbook, see [molecule/default/converge.yml](molecule/default/converge.yml).

License
-------

GPLv3

Author Information
------------------

Nikolaos Kakouros (nkak@kth.se)
